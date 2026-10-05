package com.taskmanager.controller;

import com.taskmanager.dto.ChatMessageDTO;
import com.taskmanager.dto.ChatMessageRequest;
import com.taskmanager.service.ChatMessageService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/chat")
@RequiredArgsConstructor
public class ChatController {

    private final ChatMessageService chatMessageService;

    @GetMapping("/messages")
    public ResponseEntity<List<ChatMessageDTO>> getMessages() {
        return ResponseEntity.ok(chatMessageService.getMessages());
    }

    @PostMapping("/messages")
    public ResponseEntity<ChatMessageDTO> sendMessage(
            @Valid @RequestBody ChatMessageRequest request,
            Authentication authentication
    ) {
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(chatMessageService.sendMessage(request, authentication.getName()));
    }
}
