import { Message } from './../../_interfaces/chat.interface';
import { Component, Input, OnInit } from '@angular/core';
import { User } from '@app/_interfaces/user.interface';
import { AccountService } from '@app/_services/account.service';
import { ChatService } from '@app/_services/chat.service';

@Component({
  selector: 'app-help',
  templateUrl: './help.component.html',
  styleUrls: ['./help.component.scss']
})
export class HelpComponent implements OnInit {

  @Input() simply:boolean=false;
  messages:Message[]=[];
  user:User;
  currentMessage='';
  constructor(
    private accountService: AccountService,
    private chatService: ChatService,

  ) {
    this.user=this.accountService.userValue;
  }

  ngOnInit(): void {
  }

  async sendAndBotAnswer(){
    console.log(this.currentMessage);
    if(this.currentMessage!=''){
      const message:Message={
        message: this.currentMessage,
        date: new Date,
        senderUser: true,
        userId:Number(this.user.id)
      }
      this.messages.push(message);
      const answer=await this.chatService.generateText(this.currentMessage);
      const answerBot:Message={
        message: String(answer),
        date: new Date,
        senderUser: false,
        userId:-1
      }
      this.messages.push(answerBot);
      this.currentMessage='';

    }

  }

}
