package com.taskmanager.service;

import com.taskmanager.dto.DashboardStatsDTO;
import com.taskmanager.entity.TaskStatus;
import com.taskmanager.repository.ProjectRepository;
import com.taskmanager.repository.TaskRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class DashboardService {

    private final ProjectRepository projectRepository;
    private final TaskRepository taskRepository;

    public DashboardStatsDTO getStats() {
        long totalProjects = projectRepository.count();
        long totalTasks = taskRepository.count();
        long pendingTasks = taskRepository.countByStatus(TaskStatus.PENDING);
        long inProgressTasks = taskRepository.countByStatus(TaskStatus.IN_PROGRESS);
        long completedTasks = taskRepository.countByStatus(TaskStatus.COMPLETED);
        long overdueTasks = taskRepository.countOverdueTasks();

        return DashboardStatsDTO.builder()
                .totalProjects(totalProjects)
                .totalTasks(totalTasks)
                .pendingTasks(pendingTasks)
                .inProgressTasks(inProgressTasks)
                .completedTasks(completedTasks)
                .overdueTasks(overdueTasks)
                .build();
    }
}
