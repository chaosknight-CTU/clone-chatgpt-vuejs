<template>
  <div id="chat_container">
    <div v-for="(chat, i) in wrapper" :key="i" class="wrapper" :class="{ ai: chat.isAi }">
      <ChatView :chat="chat" :key="i" />
    </div>
  </div>
  <form @submit.prevent="fetchAnswer">
    <textarea rows="1" cols="1" placeholder="Ask VueChat..." v-model="question"></textarea>
    <button type="submit"><img src="@/assets/send.svg" alt="send" /></button>
  </form>
</template>
<script setup>
import { ref } from "vue";
import ChatView from "@/components/ChatView.vue";
const question = ref("");
const wrapper = ref([]);
const loading = ref(false);
const fetchAnswer = async () => {
  try {
    loading.value = true;
    wrapper.value.push({
      isAi: false,
      value: question.value,
    });
    wrapper.value.push({
      isAi: true,
      value: "Loading....",
    });
    const res = await fetch("http://localhost:8080", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        question: question.value,
      }),
    });
    // console.log(res);
    const data = await res.json();
    console.log(data);
    const parsedData = data.bot.trim();
    wrapper.value.pop();
    wrapper.value.push({
      isAi: true,
      value: parsedData,
    });
  } catch (error) {
  } finally {
    loading.value = false;
    question.value = ''
  }
};
</script>