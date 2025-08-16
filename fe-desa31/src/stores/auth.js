import router from "@/router";
import Cookies from "js-cookie";
import { defineStore } from "pinia";
import { handleError } from "@/Helpers/errorHelpers";
import { axiosInstance } from "@/plugins/axios";

export const useAuthStore = defineStore("auth", {
    state: () => ({
        user: null,
        loading: false,
        error: null,
        success: null,
    }),
    getters: {
        token: (state) => Cookies.get("token"),
    },
    actions: {
        async login(credentials) {
            this.loading = true;
            try {
                const response = await axiosInstance.post(
                    "/login",
                    credentials
                );
                const token = response.data.token;
                Cookies.set("token", token);
                this.success = "Login successful";
                router.push({ name: "dashboard" });
            } catch (error) {
                this.error = handleError(error);
            } finally {
                this.loading = false;
            }
        },

        async logout() {
            Cookies.remove("token");
            router.push({ name: "login" });
            this.user = null;
            this.error = null;
            this.success = "Logout successful";
        },

        async checkAuth() {
            this.loading = true;
            try {
                const response = await axiosInstance.get("/me");
                this.user = response.data.data;
                return this.user;
            } catch (error) {
                if (error.response && error.response.status === 401) {
                    this.logout();
                }
            } finally {
                this.loading = false;
            }
        },
    },
});
