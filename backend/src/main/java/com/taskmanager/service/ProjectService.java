package com.taskmanager.service;

import com.taskmanager.dto.ProjectDTO;
import com.taskmanager.entity.Project;
import com.taskmanager.entity.User;
import com.taskmanager.repository.ProjectRepository;
import com.taskmanager.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ProjectService {

    private final ProjectRepository projectRepository;
    private final UserRepository userRepository;

    public ProjectDTO createProject(ProjectDTO projectDTO, String adminEmail) {
        User admin = userRepository.findByEmail(adminEmail).orElseThrow();
        
        Project project = Project.builder()
                .title(projectDTO.getTitle())
                .description(projectDTO.getDescription())
                .startDate(projectDTO.getStartDate())
                .endDate(projectDTO.getEndDate())
                .admin(admin)
                .build();
                
        return mapToDTO(projectRepository.save(project));
    }

    public List<ProjectDTO> getAllProjects() {
        return projectRepository.findAll().stream()
                .map(this::mapToDTO)
                .collect(Collectors.toList());
    }

    public ProjectDTO updateProject(Long id, ProjectDTO projectDTO) {
        Project project = projectRepository.findById(id).orElseThrow();
        project.setTitle(projectDTO.getTitle());
        project.setDescription(projectDTO.getDescription());
        project.setStartDate(projectDTO.getStartDate());
        project.setEndDate(projectDTO.getEndDate());
        
        return mapToDTO(projectRepository.save(project));
    }

    public void deleteProject(Long id) {
        projectRepository.deleteById(id);
    }

    public ProjectDTO getProjectById(Long id) {
        return mapToDTO(projectRepository.findById(id).orElseThrow());
    }

    private ProjectDTO mapToDTO(Project project) {
        return ProjectDTO.builder()
                .id(project.getId())
                .title(project.getTitle())
                .description(project.getDescription())
                .startDate(project.getStartDate())
                .endDate(project.getEndDate())
                .adminId(project.getAdmin().getId())
                .adminName(project.getAdmin().getName())
                .build();
    }
}
