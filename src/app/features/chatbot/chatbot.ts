import { Component, NgModule, ChangeDetectorRef } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule, NgModel } from '@angular/forms';

@Component({
  selector: 'app-chatbot',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './chatbot.html',
  styleUrl: './chatbot.scss',
})
export class Chatbot {
  isOpen = false;
  userInput = '';
  messages: { sender: 'user' | 'bot'; text: string }[] = [];

  constructor(private http: HttpClient, private cdr: ChangeDetectorRef) {}

  toggleChat() {
    this.isOpen = !this.isOpen;
  }

  sendMessage() {
    if (!this.userInput.trim()) return;

    const question = this.userInput.trim();
    this.messages.push({ sender: 'user', text: question });
    this.userInput = '';

    // Immediately show "thinking..."
    this.messages.push({ sender: 'bot', text: '⏳ Thinking...' });

    const messages = [
      {
        role: 'system',
        content: `You are an AI assistant for a User Management System built with Angular and Node.js.
        You only answer questions related to this project’s features, APIs, login, CRUD operations, or structure.
        If asked unrelated questions, respond: "I can only answer about the User Management System."`,
      },
      { role: 'user', content: question },
    ];
//http://localhost:3000/api/chat
    // https://user-management-backend-tepl.onrender.com/api/chat
    // ✅ Call your backend API (not OpenAI directly)
    this.http.post('https://user-management-backend-tepl.onrender.com/api/chat', { messages }).subscribe({
      next: (res: any) => {
        const reply = res?.choices?.[0]?.message?.content || '⚠️ No response received.';
        // Replace "thinking..." with actual reply
        this.messages[this.messages.length - 1] = { sender: 'bot', text: reply };
        setTimeout(() => this.cdr.detectChanges(), 0);
        // this.messages.push({ sender: 'bot', text: reply });
      },
      error: (err) => {
        this.messages[this.messages.length - 1] = {
          sender: 'bot',
          text: '⚠️ Error: unable to get response.',
        };
        setTimeout(() => this.cdr.detectChanges(), 0);
      },
    });
  }
}
