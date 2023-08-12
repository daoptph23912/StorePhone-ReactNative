
// import react from "react";
// import { StyleSheet, SafeAreaView, View, Text } from "react-native";
// export default function EntertaimentScreen() {
//     return (
//         <SafeAreaView>
//             <Text>Chat</Text>
//         </SafeAreaView>
//     )
// }
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, StyleSheet } from 'react-native';
import { findBestMatch } from 'string-similarity';
const EntertaimentScreen = () => {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);

  const sendMessage = () => {
    if (message.trim() === '') return;

    const newMessage = {
      id: messages.length.toString(),
      text: message,
      isSent: true,
    };

    setMessages([...messages, newMessage]);
    setMessage('');

    // Xử lý chức năng tự động trả lời
    setTimeout(() => {
      const keywords = [
        { keyword: 'giá bao nhiêu', response: ' Sản phẩm này hiện đang có giá 200000 đồng.' },
        { keyword: 'sản phẩm này còn hàng không', response: ' Hiện tại sản phẩm này còn hàng.' },
        { keyword: 'hôm nay là thứ mây', response: ' Hôm nay chắc chắn là thứ hai' },
        { keyword: 'sản phẩm rất tốt ', response: ' Cảm ơn bạn đã ghé qua shop chúng tôi' },
        { keyword: 'đã giao hàng chưa vậy ', response: ' Hiện tại chúng tôi đang giao hàng cho bạn ạ.' },
        { keyword: 'hàng sắp đến nơi chưa ', response: ' Khoảng tầm 5 ngày đến 1 tuần nữa thì chúng tôi sẽ giao cho bạn nha.' },
        { keyword: 'Được đấy ', response: ' Cảm ơn bạn.' },
        { keyword: 'Rất chất lượng ', response: ' Cảm ơn bạn.' },
        { keyword: 'nhân viên rất xinh ', response: ' Cảm ơn bạn.' },
        { keyword: 'bạn đã có người yêu chưa ', response: ' Cảm ơn bạn.' },
        { keyword: 'địa chỉ cửa hàng ở đâu vậy ', response: ' Ở 12 trần thái tông , Thái Bình ..' },
        { keyword: 'địa chỉ  ', response: ' Ở 12 trần thái tông , Thái Bình ..' },
        { keyword: 'quán ở đâu vậy ', response: ' Ở 12 trần thái tông , Thái Bình ..' },
        { keyword: 'hello ', response: ' Chào bạn, tôi có thể giúp gì cho bạn không' },
        { keyword: 'xin chào ', response: ' Chào bạn, tôi có thể giúp gì cho bạn không' },
        { keyword: 'hi ', response: ' Chào bạn, tôi có thể giúp gì cho bạn không' },
        { keyword: 'helooo ', response: ' Chào bạn, tôi có thể giúp gì cho bạn không' },
        { keyword: 'san pham nay gia bao nhieu', response: 'sản phẩm này giá 100.000 vnđ' },
        { keyword: 'gia bao nhieu', response: 'sản phẩm này giá 100.000 vnđ' },
        { keyword: 'dien thoai nay gia bao nhiêu', response: 'sản phẩm này giá 10.000.000 vnđ' },
        { keyword: 'cai sạc  nay gia bao nhieu', response: 'sản phẩm này giá 100.000 vnđ' },
        { keyword: 'ban co biet thong tin ve cai dien thoai nay khong', response: 'Điện thoại iphone 14 với thiết kế mỏng nhẹ chỉ có giá là 20.000.000 vnđ ' },
      ];

      let bestMatch = findBestMatch(message.toLowerCase(), keywords.map((item) => item.keyword.toLowerCase()));
      let matchedKeyword = keywords[bestMatch.bestMatchIndex];

      if (bestMatch.bestMatch.rating < 0.6) {
        // Nếu độ tương đồng quá thấp, không tìm thấy từ khóa chính xác
        matchedKeyword = { keyword: '', response: 'Xin lỗi vui lòng có thể ghi lại câu hỏi được không ?' };
      }

      const autoReply = {
        id: (messages.length + 1).toString(),
        text: matchedKeyword.response,
        isSent: false,
      };

      setMessages((prevMessages) => [...prevMessages, autoReply]);
    }, 1000);
  };


  const renderItem = ({ item }) => (
    <View style={[styles.messageContainer, item.isSent ? styles.sentMessage : styles.receivedMessage]}>
      <Text style={styles.messageText}>{item.text}</Text>
    </View>
  );

  return (
    <View style={styles.container}>

      <FlatList
        style={styles.messagesList}
        data={messages}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        inverted
      />

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Type your message..."
          value={message}
          onChangeText={(text) => setMessage(text)}
        />

        <TouchableOpacity style={styles.sendButton} onPress={sendMessage}>
          <Text style={styles.sendButtonText}>Send</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  messagesList: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  messageContainer: {
    borderRadius: 8,
    padding: 8,
    marginBottom: 8,
    maxWidth: '70%',
  },
  sentMessage: {
    alignSelf: 'flex-end',
    backgroundColor: '#2979FF',
  },
  receivedMessage: {
    alignSelf: 'flex-start',
    backgroundColor: '#E0E0E0',
  },
  messageText: {
    color: 'black',
    fontSize: 16,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
  input: {
    flex: 1,
    height: 40,
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    paddingHorizontal: 16,
  },
  sendButton: {
    marginLeft: 16,
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: '#2979FF',
    borderRadius: 20,
  },
  sendButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
  },
});

export default EntertaimentScreen;
