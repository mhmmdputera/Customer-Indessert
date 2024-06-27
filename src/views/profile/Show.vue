<template>
  <div class="container-fluid mb-5 mt-4">
    <div class="row">
      <div class="col-md-3 mb-4">
        <CustomerMenu />
      </div>
      <div class="col-md-9 mb-4">
        <div class="card border-0 rounded shadow">
          <div class="card-body">
            <h5 class="font-weight-bold"><i class="fas fa-user"></i> MY PROFILE</h5>
            <hr>
            <div v-if="profile">
              <table class="table table-striped table-bordered">
                <tbody>
                  <tr>
                    <th scope="row">Full Name</th>
                    <td>{{ profile.name }}</td>
                  </tr>
                  <tr>
                    <th scope="row">Email</th>
                    <td>{{ profile.email }}</td>
                  </tr>
                  <tr>
                    <th scope="row">Password</th>
                    <td>{{ profile.password }}</td>
                  </tr>
                </tbody>
              </table>
              
                <router-link :to="{ name: 'edit_profile' }" class="btn btn-primary btn-edit"><i class="fas fa-pencil-alt"></i> Edit Profile</router-link>
                <button @click="deleteProfile" class="btn btn-danger btn-delete"><i class="fas fa-trash"></i> Hapus Profile</button>
             
              
            </div>
            <div v-else>
              <p>Loading profile...</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import CustomerMenu from '../../components/CustomerMenu.vue';
import { computed, onMounted } from 'vue';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';
import Swal from 'sweetalert2';

export default {
  name: 'ProfileShowComponent',
  components: {
    CustomerMenu
  },
  setup() {
    const store = useStore();
    const router = useRouter();

    const profile = computed(() => store.getters['auth/currentUser']);

    const fetchProfile = () => {
      store.dispatch('auth/getUser');
    };

    onMounted(fetchProfile);

    const editProfile = () => {
      store.commit('auth/SET_USER', profile.value);
      router.push({ name: 'edit_profile' });
    };

    const deleteProfile = async () => {
      const result = await Swal.fire({
        title: 'Apakah Kamu Yakin?',
        text: "Ingin Menghapus Akun ini?",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Ya',
        cancelButtonText: 'Tidak',
        customClass: {
          actions: 'swal2-actions-custom'
        }
      });

      if (result.isConfirmed) {
        try {
          await store.dispatch('auth/deleteUser');
          Swal.fire(
            'Deleted!',
            'Your profile has been deleted.',
            'success'
          );
          router.push({ name: 'home' });
        } catch (error) {
          console.error('Error deleting profile:', error);
          Swal.fire(
            'Error!',
            'There was an error deleting your profile.',
            'error'
          );
        }
      }
    };

    return {
      profile,
      editProfile,
      deleteProfile
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


.btn-edit {
  background-color: #007bff;
  border-color: #007bff;
  margin-right: 15px;
  
}

.btn-edit:hover {
  background-color: #0056b3;
  border-color: #0056b3;
}

.btn-delete {
  background-color: #dc3545;
  border-color: #dc3545;
  
}

.btn-delete:hover {
  background-color: #c82333;
  border-color: #c82333;
}

</style>
