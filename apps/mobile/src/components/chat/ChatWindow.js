import React, { useEffect, useState } from "react";
import { View, Text, TextInput, Button, ScrollView } from "react-native";
import { api } from "../services/api";

export const ChatWindow = ({ companyId }) => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  useEffect(() => {
    fetchMessages();
  }, []);

  const fetchMessages = async () => {
    const res = await api.get("/chats");
    setMessages(res.data);
  };

  const sendMessage = async () => {
    if (!input) return;
    await api.post("/chats", { message: input });
    setInput("");
    fetchMessages();
  };

  return (
    <View style={{ flex: 1 }}>
      <ScrollView>
        {messages.map((m) => (
          <Text key={m.id}>{m.user_name}: {m.message}</Text>
        ))}
      </ScrollView>
      <TextInput value={input} onChangeText={setInput} placeholder="Message..." />
      <Button title="Send" onPress={sendMessage} />
    </View>
  );
};