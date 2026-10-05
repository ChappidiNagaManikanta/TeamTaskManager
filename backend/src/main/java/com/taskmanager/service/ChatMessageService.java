package com.taskmanager.service;

import com.taskmanager.dto.ChatMessageDTO;
import com.taskmanager.dto.ChatMessageRequest;
import com.taskmanager.entity.ChatMessage;
import com.taskmanager.entity.User;
import com.taskmanager.repository.ChatMessageRepository;
import com.taskmanager.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ChatMessageService {

    private final ChatMessageRepository chatMessageRepository;
    private final UserRepository userRepository;

    @Transactional(readOnly = true)
    public List<ChatMessageDTO> getMessages() {
        return chatMessageRepository.findAllByOrderBySentAtAsc()
                .stream()
                .map(this::toDTO)
                .toList();
    }

    @Transactional
    public ChatMessageDTO sendMessage(ChatMessageRequest request, String senderEmail) {
        User sender = userRepository.findByEmail(senderEmail)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.UNAUTHORIZED, "User not found"));
        ChatMessage message = ChatMessage.builder()
                .sender(sender)
                .message(request.getMessage().trim())
                .build();
        return toDTO(chatMessageRepository.save(message));
    }

    private ChatMessageDTO toDTO(ChatMessage message) {
        return ChatMessageDTO.builder()
                .id(message.getId())
                .senderId(message.getSender().getId())
                .senderName(message.getSender().getName())
                .senderRole(message.getSender().getRole())
                .message(message.getMessage())
                .sentAt(message.getSentAt())
                .build();
    }
}
