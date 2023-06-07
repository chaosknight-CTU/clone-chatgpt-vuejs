
<template>
  <header class="p-3 mb-3 border-bottom">
    <div class="container">
      <div class="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start">
        <a href="#" class="h5 text-white text-decoration-none">Chat GPT</a>

        <form class="col-12 col-lg-auto mb-3 mb-lg-0 me-lg-3">
        </form>

        <div class="text-end" v-if="store.userInfor">
          <span class="text-white" style="display: inline-block;padding-right: 10px;">{{ store.userInfor.username
          }}</span>

          <div class="btn btn-outline-primary btn-sm" @click="logout">Đăng xuất</div>
        </div>
      </div>
    </div>
  </header>
  <RouterView />
</template>

<script setup>
import { RouterView } from 'vue-router'
import store from '@/store'
import token from '@/utils/token'

const logout = () => {
  token.set(null);

  window.location = '/'
}
</script>

