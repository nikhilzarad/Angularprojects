import { Component, Input, OnInit } from '@angular/core';
import { interval } from 'rxjs';
import { QuestionserviceService } from '../service/questionservice.service';

@Component({
  selector: 'app-questions',
  templateUrl: './questions.component.html',
  styleUrls: ['./questions.component.css'],
})
export class QuestionsComponent implements OnInit {
  name: string = '';
  points: number = 0;
  counter: number = 60;
  interval$: any;
  QuestionList: any = [];
  currentQuestion: number = 0;
  correctAnswer: number = 0;
  incorrectAnswer: number = 0;
isCompleredQuiz: boolean=false;
  constructor(private questionService: QuestionserviceService) {}
  ngOnInit(): void {
    this.name = localStorage.getItem('name')!;
    this.getQuestions();
    this.startCounter();
  }
  getQuestions() {
    this.questionService.gellQuestionJson().subscribe((res) => {
      this.QuestionList = res.questions;
    });
  }
  answer(questionNo: number, option: any) {
    if(questionNo===this.QuestionList.length){
this.isCompleredQuiz=true;
this.stopCounter();
    }
    if (option.correct) {
      setTimeout(()=>{
        this.points += 10;
        this.correctAnswer++;
        this.currentQuestion++;
        this.counter=60;
      },1000)

    } else {
      setTimeout(()=>{
        this.points -= 5;
        this.incorrectAnswer++;
        this.currentQuestion++;
        this.counter=60;
      },1000)

    }
  }
  startCounter() {
    this.interval$ = interval(1000).subscribe((res) => {
      this.counter--;
      if (this.counter === 0) {
        this.currentQuestion++;
        this.counter = 60;
        this.points -= 10;
      }
    });
    setTimeout(() => {
      this.interval$.unsubscribe();
    }, 600000);
  }
  stopCounter() {
    this.interval$.unsubscribe();
    this.counter = 0;
  }

  resetCounter() {
    this.stopCounter();
    this.counter = 60;
    this.startCounter();
  }
  nextQuestion() {
    this.currentQuestion++;
    this.counter = 60;
    if(this.currentQuestion!==this.QuestionList.length){
      this.isCompleredQuiz=false;
    }else{
      this.isCompleredQuiz=true;


    }
  }
  refreshQuiz() {
    this.resetCounter();
    this.currentQuestion = 0;
    this.points = 0;
    if(this.currentQuestion!==this.QuestionList.length){
      this.isCompleredQuiz=true;
    }
  }
  previousQuestion() {
    this.currentQuestion--;
  }
}
