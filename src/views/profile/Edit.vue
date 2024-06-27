<template>
  <div class="container-fluid mb-5 mt-4">
    <div class="row">
      <div class="col-md-3 mb-4">
        <CustomerMenu />
      </div>
      <div class="col-md-9 mb-4">
        <div class="card border-0 rounded shadow">
          <div class="card-body">
            <h5 class="font-weight-bold"><i class="fas fa-user"></i> EDIT PROFILE</h5>
            <hr>
            <form @submit.prevent="updateUser">
              <div class="row">
                <div class="col-md-6">
                  <div class="form-group">
                    <label>Full Name</label>
                    <input type="text" v-model="user.name" class="form-control" placeholder="Full Name">
                  </div>
                  <div v-if="validation.name" class="mt-2 alert alert-danger">
                    {{ validation.name }}
                  </div>
                </div>
                <div class="col-md-6">
                  <div class="form-group">
                    <label>Email address</label>
                    <input type="email" v-model="user.email" class="form-control" placeholder="Email Address">
                  </div>
                  <div v-if="validation.email" class="mt-2 alert alert-danger">
                    {{ validation.email }}
                  </div>
                </div>
                <div class="col-md-6">
                  <div class="form-group">
                    <label>Password</label>
                    <input type="password" v-model="user.password" class="form-control" placeholder="Password">
                  </div>
                  <div v-if="validation.password" class="mt-2 alert alert-danger">
                    {{ validation.password[0] }}
                  </div>
                </div>
                <div class="col-md-6">
                  <div class="form-group">
                    <label>Konfirmasi Password</label>
                    <input type="password" v-model="user.password_confirmation" class="form-control" placeholder="Konfirmasi Password">
                  </div>
                </div>
              </div>
              <button type="submit" class="btn btn-primary"><i class="fa fa-paper-plane"></i> Update</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
import CustomerMenu from '../../components/CustomerMenu.vue';
import { useStore } from 'vuex';
import { ref, reactive, onMounted } from 'vue'
import { useRouter } from 'vue-router'

export default {
  
  name: 'ProfileEditComponent',

  components: {
    
    CustomerMenu
  },

  setup() {

    //user state
    const user = reactive({
                name: '',
                email: '',
                password: '',
                password_confirmation: ''
            })

    const store = useStore()

    const router = useRouter()

    // Fetch current user data from Vuex store when component is mounted
    onMounted(() => {
      const currentUser = store.getters['auth/currentUser'];
      user.name = currentUser.name;
      user.email = currentUser.email;
    });

     //validation state
     const validation = ref([])

    //function updateUser, fungsi ini di jalankan ketika form di submit
    function updateUser() {

      //define variable 
      let name     = user.name
      let email    = user.email
      let password = user.password
      let password_confirmation = user.password_confirmation

      //panggil action "updateUser" di dalam module "auth" vuex
      store.dispatch('auth/updateUser', {
          name,
          email,
          password,
          password_confirmation
      })
      .then(() => {
          //redirect ke dashboard
          router.push({name: 'profile'})
      }).catch(error => {
          //show validaation message
          validation.value = error
      })
    }



    return {
      user,
      validation,
      updateUser
    };
  }
};
</script>

<style scoped>
.table .thead-dark th {
  color: #fff;
  background-color: #6777ef;
  border-color: #6777ef;
}
</style>
