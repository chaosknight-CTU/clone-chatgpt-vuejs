<template>
	<div class="d-flex flex-column align-items-center">
		<h2>Đăng ký</h2>
		<register-form @submit:register="register" />
	</div>
</template>

<script>
import AuthService from "@/services/auth.service";
import store from "@/store";
import RegisterForm from "./components/RegisterForm.vue";
export default {
	components: { RegisterForm },
	methods: {
		async register(formData) {
			try {
				await AuthService.register(formData);
				await store.login(formData);
				this.$router.push('/');
			} catch (error) {
				alert(error.message);
			}
		},
	},
};
</script>