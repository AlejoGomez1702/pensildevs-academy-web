import { inject } from '@angular/core';
import type { ResolveFn, Routes } from '@angular/router';
import { contentDescription, contentTitle, provideLibrary, WatchLesson } from '../library';
import { ROUTE_DESCRIPTION } from '../shared/infrastructure/seo-title-strategy';

const lessonTitle: ResolveFn<string> = async (route) => {
  const result = await inject(WatchLesson).execute(
    route.paramMap.get('slug') ?? '',
    route.paramMap.get('lesson') ?? '',
  );
  return result.ok
    ? `${result.value.navigation.lesson.title} · ${result.value.course.title}`
    : 'Lección no disponible';
};

export const COURSES_ROUTES: Routes = [
  {
    path: '',
    providers: [provideLibrary()],
    children: [
      {
        path: ':slug',
        title: contentTitle('course', 'Curso no encontrado'),
        resolve: { [ROUTE_DESCRIPTION]: contentDescription('course') },
        loadComponent: () => import('./ui/course-page').then((m) => m.CoursePage),
      },
      {
        path: ':slug/:lesson',
        title: lessonTitle,
        resolve: { [ROUTE_DESCRIPTION]: contentDescription('course') },
        loadComponent: () => import('./ui/lesson-page').then((m) => m.LessonPage),
      },
      { path: '', pathMatch: 'full', redirectTo: '/' },
    ],
  },
];
