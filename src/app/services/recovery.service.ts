// src/app/services/recovery.service.ts
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RecoveryService {
  private documentNumber: string = '';

  setDocumentNumber(documentNumber: string) {
    this.documentNumber = documentNumber;
  }

  getDocumentNumber() {
    return this.documentNumber;
  }

  clearDocumentNumber() {
    this.documentNumber = '';
  }
}

