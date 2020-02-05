import { Component, OnInit, HostListener } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from  'angularfire2/database'; 
import { Observable } from 'rxjs';



@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {
  contactForm: FormGroup;
  itemName = '';
  itemEmail = '';
  itemSubject = '';
  itemMessage = '';
  items: Observable<any[]>;

  constructor(private fb: FormBuilder, private afa: AngularFireAuth, private db: AngularFireDatabase) {
    this.items = db.list('messages').valueChanges()
    this.contactForm = fb.group({
      contactFormName: ['', Validators.required],
      contactFormEmail: ['', [Validators.required, Validators.email]],
      contactFormSubject: ['', Validators.required],
      contactFormMessage: ['', Validators.required]
   });

  }

    // Pushing the contact-form to the firebase data base
    onSubmit()  {
      this.db.list('/messages').push({ name: this.itemName, email: this.itemEmail, subject: this.itemSubject, 
      message: this.itemMessage});
//Popup message
      alert('Thank you for contacting us, your message has gone through!')
     }
  
// Clearing the form after submit
clearForm() {
        this.contactForm.reset();
       }


ngOnInit() {
  }
}
  






 

  