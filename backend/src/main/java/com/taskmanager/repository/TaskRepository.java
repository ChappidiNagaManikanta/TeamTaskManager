package com.taskmanager.repository;

import com.taskmanager.entity.Task;
import com.taskmanager.entity.TaskStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TaskRepository extends JpaRepository<Task, Long> {
    List<Task> findByProjectId(Long projectId);
    List<Task> findByAssigneeId(Long assigneeId);
    long countByStatus(TaskStatus status);
    
    @Query("SELECT COUNT(t) FROM Task t WHERE t.dueDate < CURRENT_DATE AND t.status != 'COMPLETED'")
    long countOverdueTasks();
}
