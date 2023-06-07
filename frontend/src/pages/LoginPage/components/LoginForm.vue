<template>
	<vee-form @submit="handleSubmit" :validation-schema="loginSchema" @invalid-submit="validate">
		<div class="mb-3">
			<label for="username" class="form-label">
				Tên đăng nhập
			</label>
			<field class="form-control" name="username" v-model="formData.username" autofocus
				:class="{ 'is-invalid': error.username }" />
			<error-message name="username" class="invalid-feedback" />
		</div>

		<div class="mb-3">
			<label for="password" class="form-label">
				Mật khẩu
			</label>
			<field class="form-control" name="password" type="password" v-model="formData.password"
				:class="{ 'is-invalid': error.password }" />
			<error-message name="password" class="invalid-feedback" />
		</div>

		<button class="btn btn-primary text-white" type="submit">
			Đăng nhập
		</button>

		<hr />

		<p>
			Bạn chưa có tài khoản?
			<router-link :to="{ name: 'register' }">
				Đăng ký ngay
			</router-link>
		</p>
	</vee-form>
</template>

<script>
import {
	Form as VeeForm,
	Field,
	ErrorMessage,
} from "vee-validate";
import * as yup from "yup";
export default {
	data() {
		const loginSchema = yup.object().shape({
			username: yup
				.string()
				.required("Tên người dùng là bắt buộc"),
			password: yup
				.string()
				.required("Mật khẩu là bắt buộc"),
		});
		return {
			loginSchema,
			formData: {
				username: "",
				password: "",
			},
			error: {},
		};
	},
	components: { VeeForm, Field, ErrorMessage },
	emits: ["submit"],
	methods: {
		handleSubmit() {
			this.$emit("submit", this.formData);
		},
		validate() {
			try {
				this.loginSchema.validateSync(
					this.formData
				);
				this.error = {};
			} catch (error) {
				this.error = {
					[error.path]: true,
				};
			}
		},
	},
};
</script>