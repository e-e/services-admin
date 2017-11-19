(function() {
  function noop() {}
  function paramString(data) {
    const e = encodeURIComponent;
    return Object.keys.reduce((str, key) => {
      return `${str}${str.length ? '&' : ''}${key}=${e(data[key])}`;
    }, '');
  }
  function GET(url) {
    return new Promise((resolve, reject) => {
      let ajax = new XMLHttpRequest();
      ajax.onreadystatechange = function() {
        if (this.readyState === 4) {
          resolve(this);
        }
      };
      ajax.open('GET', url, true);
      ajax.send();
    });
  }

  function POST(url, data = {}) {
    // data = paramString(data);
    return new Promise((resolve, reject) => {
      let ajax = new XMLHttpRequest();
      ajax.onreadystatechange = function() {
        if (this.readyState === 4) {
          resolve(this);
        }
      };
      ajax.open('POST', url, true);
      ajax.setRequestHeader('Content-type', 'application/json');
      ajax.send(JSON.stringify(data));
    });
  }
  const vm = new Vue({
    el: '#app',
    mounted() {
      this.getServices();
      this.setView('table');
    },
    data: {
      loading: true,
      nav: [
        { label: 'service list', view: 'table' },
        { label: '+new', view: 'add-service' }
      ],
      view: 'add-service',
      services: [],
      static: {
        days: [
          { label: 'Sunday', value: 'SUNDAY' },
          { label: 'Monday', value: 'MONDAY' },
          { label: 'Tuesday', value: 'TUESDAY' },
          { label: 'Wednesday', value: 'WEDNESDAY' },
          { label: 'Thursday', value: 'THURSDAY' },
          { label: 'Friday', value: 'FRIDAY' },
          { label: 'Saturday', value: 'SATURDAY' }
        ],
        states: [
          'Alabama',
          'Alaska',
          'Arizona',
          'Arkansas',
          'California',
          'Colorado',
          'Connecticut',
          'Delaware',
          'Florida',
          'Georgia',
          'Hawaii',
          'Idaho',
          'Illinois Indiana',
          'Iowa',
          'Kansas',
          'Kentucky',
          'Louisiana',
          'Maine',
          'Maryland',
          'Massachusetts',
          'Michigan',
          'Minnesota',
          'Mississippi',
          'Missouri',
          'Montana Nebraska',
          'Nevada',
          'New Hampshire',
          'New Jersey',
          'New Mexico',
          'New York',
          'North Carolina',
          'North Dakota',
          'Ohio',
          'Oklahoma',
          'Oregon',
          'Pennsylvania Rhode Island',
          'South Carolina',
          'South Dakota',
          'Tennessee',
          'Texas',
          'Utah',
          'Vermont',
          'Virginia',
          'Washington',
          'West Virginia',
          'Wisconsin',
          'Wyoming'
        ],
        serviceTypes: [
          [
            { label: 'Shelter', value: 'SHELTER' },
            { label: 'Drop-In Center', value: 'DROPIN' },
            { label: 'Healthcare', value: 'HEALTHCARE' }
          ],
          [
            { label: 'Meals', value: 'MEALS' },
            { label: 'Addiction', value: 'ADDICTION' },
            { label: 'Clothing', value: 'CLOTHING' }
          ]
        ],
        availableTo: [
          [
            { label: 'Men', value: 'MEN' },
            { label: 'Women', value: 'WOMEN' },
            { label: 'Teens', value: 'TEENS' },
            { label: 'Children', value: 'CHILDREN' }
          ],
          [
            { label: 'Families', value: 'FAMILIES' },
            { label: 'Pets', value: 'PETS' },
            { label: 'Couples', value: 'COUPLES' }
          ]
        ]
      },
      form: {
        name: '',
        email: '',
        phone: '',
        address_1: '',
        address_2: '',
        city: 'Seattle',
        state: 'Washington',
        postalCode: '',
        country: 'United States',
        description: '',
        availableTo: [],
        services: [],
        bestTimeToCall: '',
        hours: []
      }
    },
    methods: {
      getServices(callback = noop) {
        let vm = this;
        GET('/services').then(response => {
          vm.services = JSON.parse(response.responseText);
          callback();
        });
      },
      saveNewService(callback = noop) {
        let vm = this;
        vm.loading = true;
        POST('/services', vm.form).then(response => {
          vm.form.name = '';
          vm.form.email = '';
          vm.form.phone = '';
          vm.form.address_1 = '';
          vm.form.address_2 = '';
          vm.form.postalCode = '';
          vm.form.description = '';
          vm.form.availableTo = [];
          vm.form.services = [];
          vm.form.bestTimeToCall = '';
          vm.form.hours = [];
          vm.loading = false;
          vm.getServices(function() {
            vm.setView('table');
          });
        });
      },
      setView(view) {
        this.loading = false;
        this.view = view;
      },
      getServiceById(id) {
        let service = {};
        for (let i = 0; i < this.services.length; i++) {
          if (this.services[i]._id === id) {
            service = this.services[i];
            break;
          }
        }
        return service;
      },
      editService(id) {
        this.activeService = this.getServiceById(id);
        this.view = 'edit-service';
      },
      addHours() {
        if (this.form.hours.length) {
          let index = this.form.hours.length - 1;
          let nextDayIndex = this.dayValues.indexOf(this.form.hours[index]) + 1;
          if (nextDayIndex > this.dayValues.length - 1) {
            nextDayIndex = 0;
          }
          let nextDay = this.dayValues[nextDayIndex];

          this.form.hours.push({
            day: nextDay,
            start: this.form.hours[index].start,
            end: this.form.hours[index].end
          });
        } else {
          this.form.hours.push({
            day: '',
            start: '9:00am',
            end: '5:00pm'
          });
        }
      },
      hoursDaySelect(event, index) {
        this.form.hours[index].day = event.target.value;
      },
      hoursStartInput(event, index) {
        this.form.hours[index].start = event.target.value;
      },
      hoursEndInput(event, index) {
        this.form.hours[index].end = event.target.value;
      },
      hoursRemove(index) {
        console.log(this.form.hours);
        console.log(index, this.form.hours[index]);
        this.form.hours.splice(index, 1);
        console.log(this.form.hours);
      }
    },
    computed: {
      dayValues() {
        return this.static.days.map(day => day.value);
      }
    }
  });
})();
