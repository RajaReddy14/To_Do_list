import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-create-todo',
  templateUrl: './create-todo.component.html',
  styleUrls: ['./create-todo.component.css']
})
export class CreateTodoComponent implements OnInit{
  errorExist: boolean = false;
  isEdit: boolean = false;
  todoData: any;

  formData = new FormGroup({
    title: new FormControl('', [Validators.required]),
    description: new FormControl('', [Validators.required]),
    status: new FormControl('Pending')
  });

  constructor(private modal: NgbActiveModal){
  }
  ngOnInit(): void {
    if(this.isEdit) {
      this.formData.patchValue(this.todoData)
    }
  }

  onClose(){
    this.modal.close(null);
  }


  onCreate(){
    if(!this.isEdit) {
      this.formData.get('status')?.setValue('Pending')
    }
    if(this.formData.valid) {
      this.modal.close({data:this.formData.value})
    }else {
      this.errorExist = true;
      setTimeout(() => {
        this.errorExist = false;
      }, 3000)
    }
  } 
}
