package com.taskmanager.dto;

import com.taskmanager.entity.Role;
import lombok.Builder;
import lombok.Getter;

import java.time.LocalDateTime;

@Getter
@Builder
public class ChatMessageDTO {
    private Long id;
    private Long senderId;
    private String senderName;
    private Role senderRole;
    private String message;
    private LocalDateTime sentAt;
}
