<template>
  <nav class="leftnav">
    <div class="menu-container">
      <div class="menu menu-tab active mb-6">
        <a href="#">
          <div class="icon">
            <img src="/assets/img/icon/home-white.png" alt="Image Icon" />
          </div>
          Home
        </a>
      </div>
      <div 
        v-for="(tab, i) in menu" :key="i" 
        class="menu" :class="{ 
          'has-children': tab.children && tab.children.length,
          'active': tab.status 
        }"
      >
        <a :href="tab.link" @click="onClick(tab)">
          {{tab.title}} 
          <div v-if="tab.children && tab.children.length" class="chev">
            <img src="/assets/img/icon/chev-down-02.png" alt="Image Icon" />
          </div>
        </a>
        <div 
          v-if="tab.children && tab.children.length" 
          class="submenu-container" v-show="tab.status" 
        >
          <div 
            v-for="(subtab, j) in tab.children" :key="j" 
            class="submenu" :class="{ 'w-full': !subtab.type || subtab.type != 'avatar' }"
          >
            <a v-if="subtab.type == 'avatar'" :href="subtab.link" @click="onClick(subtab)">
              <Avatar :avatar="subtab.title" />
            </a>
            <a v-else :href="subtab.link" @click="onClick(subtab)">
              {{subtab.title}}
            </a>
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
import Avatar from './Avatar.vue'
export default {
  name: 'LeftNav',
  
    Avatarprops: {
    user: { type: Object, default: {} }
  },
  data() {
    return {
      menu: [
        {
          status: false,
          title: 'Careers', link: 'javascript:',
          icon: '/assets/img/profile/03.jpg',
          children: [
            { 
              clickType: 'emit',
              title: 'Teacher', link: 'javascript:',
              icon: '/assets/img/profile/04.jpg' 
            },
            { 
              clickType: 'emit',
              title: 'Programmer', link: 'javascript:',
              icon: '/assets/img/profile/05.jpg' 
            },
            { 
              clickType: 'emit',
              title: 'Engineer', link: 'javascript:',
              icon: '/assets/img/profile/06.jpg' 
            },
            { 
              clickType: 'emit',
              title: 'Scientist', link: 'javascript:',
              icon: '/assets/img/profile/07.jpg' 
            },
            { 
              clickType: 'emit',
              title: 'Doctor', link: 'javascript:',
              icon: '/assets/img/profile/08.jpg' 
            },
            { 
              clickType: 'emit',
              title: 'Nurse', link: 'javascript:',
              icon: '/assets/img/profile/09.jpg' 
            },
            { 
              clickType: 'emit',
              title: 'Firefighters', link: 'javascript:',
              icon: '/assets/img/profile/10.jpg' 
            },
            { 
              clickType: 'emit',
              title: 'Architect', link: 'javascript:',
              icon: '/assets/img/profile/11.jpg' 
            },
            { 
              clickType: 'emit',
              title: 'Lawyers', link: 'javascript:',
              icon: '/assets/img/profile/12.jpg' 
            },
            { 
              clickType: 'emit',
              title: 'IT Manager', link: 'javascript:',
              icon: '/assets/img/profile/05.jpg' 
            },
            { 
              clickType: 'emit',
              title: 'Financial Manager', link: 'javascript:',
              icon: '/assets/img/profile/06.jpg' 
            },
            { 
              clickType: 'emit',
              title: 'Chef', link: 'javascript:',
              icon: '/assets/img/profile/07.jpg' 
            }
          ]
        },
        {
          status: false,
          title: 'Groups', link: 'javascript:',
          children: [
            { type: 'avatar', title: '/assets/img/profile/05.jpg', link: '#' },
            { type: 'avatar', title: '/assets/img/profile/06.jpg', link: '#' },
            { type: 'avatar', title: '/assets/img/profile/07.jpg', link: '#' },
            { type: 'avatar', title: '/assets/img/profile/08.jpg', link: '#' },
            { type: 'avatar', title: '/assets/img/profile/09.jpg', link: '#' }
          ]
        },
        { 
          status: false,
          title: 'Events', link: '#'
        },
        { 
          status: false,
          title: 'Reports', link: '#' 
        },
        { 
          status: false,
          title: 'Time tracking', link: '#'
        },
        { 
          status: false,
          title: 'Settings', link: '#'
        }
      ]
    }
  },
  methods: {
    onClick(tab) {
      tab.status = !tab.status;
      if(tab.clickType && tab.clickType=='emit'){
        return this.$emit('on-click', tab);
      }else{
        return true;
      }
    }
  },
  emits: [ 'on-click' ]
}
</script>
