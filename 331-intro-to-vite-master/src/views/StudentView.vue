<script setup lang="ts">
  import { ref, onMounted } from 'vue';
  import StudentService from '@/services/StudentService';

  const students = ref([]);

  onMounted(() => {
    StudentService.getStudents()
      .then(response => {
        students.value = response.data;
      })
      .catch(error => {
        console.error('There was an error!', error);
      });
  });
  </script>

<template>
    <div class="students">
      <h1>Student List</h1>
      <div v-for="student in students" :key="student.id" class="student-card">
          <h2>{{ student.name }} {{ student.surname }}</h2>
          <p>GPA: {{ student.gpa }}</p>
        </div>
    </div>
  </template>

  <style scoped>
  .students {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .student-card {
    padding: 20px;
    width: 250px;
    cursor: pointer;
    border: 1px solid #39495c;
    margin-bottom: 18px;
  }

  .student-card:hover {
    transform: scale(1.01);
    box-shadow: 0 3px 12px 0 rgba(0, 0, 0, 0.2);
  }
  </style>