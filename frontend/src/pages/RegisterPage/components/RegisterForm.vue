<template>
	<vee-form
		class="card border p-4"
		:validation-schema="registerSchema"
		@invalid-submit="validate"
		@submit="handleSubmit"
	>
		<div class="mb-3">
			<label for="username" class="form-label"
				>Tên đăng nhập</label
			>
			<field
				class="form-control"
				name="username"
				v-model="formData.username"
				autofocus
				:class="{ 'is-invalid': errors.username }"
			/>
			<error-message
				name="username"
				class="invalid-feedback"
			/>
		</div>

		<div class="mb-3">
			<label for="email" class="form-label">
				Email
			</label>
			<field
				class="form-control"
				name="email"
				type="email"
				v-model="formData.email"
				autofocus
				:class="{ 'is-invalid': errors.email }"
			/>
			<error-message
				name="email"
				class="invalid-feedback"
			/>
		</div>

		<div class="mb-3">
			<label for="password" class="form-label">
				Mật khẩu
			</label>
			<field
				class="form-control"
				name="password"
				type="password"
				v-model="formData.password"
				autofocus
				:class="{ 'is-invalid': errors.password }"
			/>
			<error-message
				name="password"
				class="invalid-feedback"
			/>
		</div>

		<div class="mb-3">
			<label for="confirmPassword" class="form-label">
				Nhập lại mật khẩu
			</label>
			<field
				class="form-control"
				name="confirmPassword"
				type="password"
				v-model="formData.confirmPassword"
				autofocus
				:class="{
					'is-invalid': errors.confirmPassword,
				}"
			/>
			<error-message
				name="confirmPassword"
				class="invalid-feedback"
			/>
		</div>

		<div>
			<button class="btn btn-primary" type="submit">
				Đăng ký
			</button>
		</div>

		<hr />

		<p>
			Bạn đã có tài khoản?
			<router-link :to="{ name: 'login' }">
				Đăng nhập ngay
			</router-link>
		</p>
	</vee-form>
</template>

<script>
import store from "@/store";
import {
	ErrorMessage,
	Field,
	Form as VeeForm,
} from "vee-validate";
import * as yup from "yup";
export default {
	data() {
		if (store.authed)
			this.$router.push({ name: "contactbook" });
		const registerSchema = yup.object().shape({
			username: yup
				.string()
				.required("Tên đăng nhập là bắt buộc")
				.min(3, "Chiều dài tối thiểu là 3 ký tự"),
			email: yup
				.string()
				.required("Email là bắt buộc")
				.email("Email không đúng định dạng"),
			password: yup
				.string()
				.required("Mật khẩu là bắt buộc")
				.min(8, "Hãy nhập ít nhất 8 ký tự"),
			confirmPassword: yup
				.string()
				.required("Vui lòng nhập lại mật khẩu")
				.oneOf(
					[yup.ref("password")],
					"Mật khẩu nhập lại không khớp"
				),
		});
		return {
			formData: {
				username: "",
				email: "",
				password: "",
				confirmPassword: "",
			},
			errors: {},
			registerSchema,
		};
	},
	components: {
		VeeForm,
		Field,
		ErrorMessage,
	},
	emits: ["submit:register"],
	methods: {
		validate(event) {
			this.errors = event.errors;
		},
		handleSubmit() {
			this.$emit("submit:register", this.formData);
		},
	},
};
</script>