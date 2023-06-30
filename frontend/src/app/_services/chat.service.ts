import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Configuration, OpenAIApi } from 'openai';
import { firstValueFrom, lastValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  constructor(
    private http: HttpClient,
  ) {
  }

  generateText(prompt: string):Promise<string | undefined>{
    const url = `/api/chat`;
    const res$=this.http.post<any>(url, {prompt});
    return firstValueFrom(res$);
  }
}

