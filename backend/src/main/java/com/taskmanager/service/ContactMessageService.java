package com.taskmanager.service;

import com.taskmanager.dto.ContactMessageDTO;
import com.taskmanager.dto.ContactMessageRequest;
import com.taskmanager.entity.ContactMessage;
import com.taskmanager.repository.ContactMessageRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ContactMessageService {

    private final ContactMessageRepository contactMessageRepository;

    public ContactMessageDTO submit(ContactMessageRequest request) {
        ContactMessage message = ContactMessage.builder()
                .name(request.getName().trim())
                .email(request.getEmail().trim())
                .subject(request.getSubject().trim())
                .message(request.getMessage().trim())
                .build();
        return toDTO(contactMessageRepository.save(message));
    }

    @Transactional(readOnly = true)
    public List<ContactMessageDTO> getAll() {
        return contactMessageRepository.findAllByOrderBySubmittedAtDesc()
                .stream()
                .map(this::toDTO)
                .toList();
    }

    @Transactional
    public ContactMessageDTO markReviewed(Long id) {
        ContactMessage message = contactMessageRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Contact message not found"));
        message.setReviewed(true);
        return toDTO(message);
    }

    private ContactMessageDTO toDTO(ContactMessage message) {
        return ContactMessageDTO.builder()
                .id(message.getId())
                .name(message.getName())
                .email(message.getEmail())
                .subject(message.getSubject())
                .message(message.getMessage())
                .submittedAt(message.getSubmittedAt())
                .reviewed(message.isReviewed())
                .build();
    }
}
