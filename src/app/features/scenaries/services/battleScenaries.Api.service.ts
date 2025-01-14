import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, map, Observable, throwError } from 'rxjs';
import { BattleScenarie } from '../interfaces/battleScenarie.interface';

@Injectable({
  providedIn: 'root',
})
export class BattleScenariesApiService {
  private scenariesUrl = 'assets/scenaries.json';
  private state = signal<{
    battleScenarios: BattleScenarie[];
    page: number;
    limit: number;
    filter: string;
  }>({
    battleScenarios: [],
    page: 0,
    limit: 2,
    filter: '',
  });

  constructor(private http: HttpClient) {
    this.getScenaries();
  }

  getScenaries(): void {
    this.http
      .get<any>(this.scenariesUrl)
      .pipe(
        map((response) => {
          return response['battle_scenarios'];
        }),
        catchError((err) => {
          console.error('Error fetching scenaries:', err);
          return throwError(err);
        })
      )
      .subscribe((response) =>
        this.state.set({ ...this.state(), battleScenarios: response })
      );
  }

  scenaries(): BattleScenarie[] {
    const filteredScenaries = this.state().battleScenarios.filter((scenarie) =>
      scenarie.type.toUpperCase().includes(this.state().filter.toUpperCase())
    );
    const paginatedScenaries = filteredScenaries.slice(
      this.state().page * this.state().limit,
      (this.state().page + 1) * this.state().limit
    );
    return paginatedScenaries;
  }

  setPage(page: number): void {
    this.state.set({ ...this.state(), page });
  }

  setFilter(filter: string): void {
    if (filter === this.state().filter) return;

    this.state.set({ ...this.state(), page: 0, filter });
  }

  setLimit(limit: number): void {
    if (limit === 0 || limit === this.state().limit) return;

    this.state.set({ ...this.state(), page: 0, limit });
  }

  getPage(): number {
    return this.state().page;
  }

  getLimit(): number {
    return this.state().limit;
  }

  getTotal(): number {
    const filteredScenaries = this.state().battleScenarios.filter((scenarie) =>
      scenarie.type.toUpperCase().includes(this.state().filter.toUpperCase())
    );

    return filteredScenaries.length;
  }
}
