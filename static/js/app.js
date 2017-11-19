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
  function DELETE(url) {
    return new Promise((resolve, reject) => {
      let ajax = new XMLHttpRequest();
      ajax.onreadystatechange = function() {
        if (this.readyState === 4) {
          resolve(this);
        }
      };
      ajax.open('DELETE', url, true);
      ajax.send();
    });
  }

  function POST(url, data = {}) {
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

  function PUT(url, data = {}) {
    // data = paramString(data);
    return new Promise((resolve, reject) => {
      let ajax = new XMLHttpRequest();
      ajax.onreadystatechange = function() {
        if (this.readyState === 4) {
          resolve(this);
        }
      };
      ajax.open('PUT', url, true);
      ajax.setRequestHeader('Content-type', 'application/json');
      ajax.send(JSON.stringify(data));
    });
  }

  Vue.component('day-select', {
    data() {
      return {
        msg: 'Selector',
        selected: null,
        open: false,
        days: [
          { label: 'Sunday', value: 'SUNDAY' },
          { label: 'Monday', value: 'MONDAY' },
          { label: 'Tuesday', value: 'Tuesday' },
          { label: 'Wednesday', value: 'WEDNESDAY' },
          { label: 'Thursday', value: 'THURSDAY' },
          { label: 'Friday', value: 'FRIDAY' },
          { label: 'Saturday', value: 'SATURDAY' }
        ]
      };
    },
    props: {
      value: {
        type: String,
        default: '---'
      }
    },
    template: `
      <div class="day-select" @click="toggleList" :class="{ open: open }">
        <div class="day-select-current">{{ currentValue.label }}</div>
        <ul class="day-select-list">
          <li v-for="day in days" :class="{ active: selected.value === day.value }" @click="selectDay(day)">
            {{ day.label }}
          </li>
        </ul>
      </div>
    `,
    methods: {
      selectDay(day) {
        this.selected = day;
        this.$emit('ondayselected', day);
      },
      toggleList() {
        this.open = !this.open;
      }
    },
    computed: {
      currentValue() {
        if (this.selected) {
          return this.selected;
        } else if (this.value) {
          for (let i = 0; i < this.days.length; i++) {
            if (this.days[i].value === this.value) {
              this.selected = this.days[i];
              return this.selected;
              break;
            }
          }
        } else {
          this.selected = { label: '---' };
          return this.selected;
        }
      }
    }
  });

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
        if (view === 'table' || view === 'add-service') {
          this.form.name = '';
          this.form.email = '';
          this.form.phone = '';
          this.form.address_1 = '';
          this.form.address_2 = '';
          this.form.postalCode = '';
          this.form.description = '';
          this.form.availableTo = [];
          this.form.services = [];
          this.form.bestTimeToCall = '';
          this.form.hours = [];
        }
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
      deleteService(id) {
        let vm = this;
        this.loading = true;
        DELETE(`/services/${id}`).then(response => {
          vm.getServices(function() {
            vm.setView('table');
          });
        });
      },
      editService(id) {
        this.activeService = this.getServiceById(id);
        this.form = this.activeService;
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
      },
      updateService() {
        this.loading = true;
        PUT(`/services/${this.form._id}`, this.form).then(response => {
          this.setView('table');
        });
      },
      daySelected(event, index) {
        console.log('day selected event!: ', event);
        this.form.hours[index].day = event.value;
      }
    },
    computed: {
      dayValues() {
        return this.static.days.map(day => day.value);
      }
    }
  });
})();
