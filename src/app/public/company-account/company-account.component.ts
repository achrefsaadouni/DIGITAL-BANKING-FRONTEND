import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Compte} from '../shared/models/Compte';
import {AccountService} from '../services/account.service';
import {Router} from '@angular/router';
import {AuthService} from '../shared/auth.service';
import {AngularFireStorage} from '@angular/fire/storage';
import {finalize} from 'rxjs/operators';

@Component({
  selector: 'app-company-account',
  templateUrl: './company-account.component.html',
  styleUrls: ['./company-account.component.css']
})
export class CompanyAccountComponent implements OnInit {

  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  thirdFormGroup: FormGroup;
  fourthFormGroup: FormGroup;
  fifthFormGroup: FormGroup;

  compte = new Compte();

  imgSrc1: string;
  selectedImage1: any = null;
  imgSrc2: string;
  selectedImage2: any = null;
  imgSrc3: string;
  selectedImage3: any = null;

  // tslint:disable-next-line:variable-name max-line-length
  constructor(private _formBuilder: FormBuilder, private service: AccountService, private route: Router, private user: AuthService, private storage: AngularFireStorage) { }

  ngOnInit() {
    this.firstFormGroup = this._formBuilder.group({
      nomEntreprise: ['', Validators.required],
      dateCreation: ['', Validators.required],
      adresse: ['', Validators.required],
      selectCredit: ['', Validators.required],
      domicile: ['', Validators.required],

    });
    this.secondFormGroup = this._formBuilder.group({
      nom: ['', Validators.required],
      prenom: ['', Validators.required],
      gender: ['', Validators.required],
      nomJF: [''],
      profession: ['', Validators.required],
      mobile: ['', Validators.required],
    });
    this.thirdFormGroup = this._formBuilder.group({
      domaine: ['', Validators.required],
      finExercice: ['', Validators.required],
      codeActivite: ['', Validators.required],
      chiffreAffaire: ['', Validators.required],
      nbrSalaries: ['', Validators.required],
      payeActivite: ['', Validators.required]
    });
    this.fourthFormGroup = this._formBuilder.group({
      selectAlimentation: ['', Validators.required],
      selectServices: ['', Validators.required]

    });
    this.fifthFormGroup = this._formBuilder.group({
      copieCIN: ['', Validators.required],
      fichePaie: ['', Validators.required],
      facture: ['', Validators.required]

    });
  }
  fileSelected1(event: any) {
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (e: any) => this.imgSrc1 = e.target.result;
      reader.readAsDataURL(event.target.files[0]);
      this.selectedImage1 = event.target.files[0];
    } else {
      this.selectedImage1 = null;
    }
  }

  fileSelected2(event: any) {
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (e: any) => this.imgSrc2 = e.target.result;
      reader.readAsDataURL(event.target.files[0]);
      this.selectedImage2 = event.target.files[0];
    } else {
      this.selectedImage2 = null;
    }
  }

  fileSelected3(event: any) {
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (e: any) => this.imgSrc3 = e.target.result;
      reader.readAsDataURL(event.target.files[0]);
      this.selectedImage3 = event.target.files[0];
    } else {
      this.selectedImage3 = null;
    }
  }

  SubmitCompte() {
    this.compte.email = this.user.getUser().email;

    // first form groupe
    this.compte.nomEntreprise = this.firstFormGroup.value.nomEntreprise;
    this.compte.date_creation = this.firstFormGroup.value.dateCreation;
    this.compte.adresse  = this.firstFormGroup.value.adresse;
    this.compte.tel_domicile = this.firstFormGroup.value.domicile;
    this.compte.credit_immediat = this.firstFormGroup.value.selectCredit;
    // second form groupe
    this.compte.nom  = this.secondFormGroup.value.nom ;
    this.compte.prenom  = this.secondFormGroup.value.prenom ;
    this.compte.gender  = this.secondFormGroup.value.gender ;
    this.compte.tel_mobile = this.secondFormGroup.value.mobile;
    this.compte.nomJF  = this.secondFormGroup.value.nomJF ;
    this.compte.profession  = this.secondFormGroup.value.profession ;
    // third form groupe
    this.compte.domaine   = this.thirdFormGroup.value.domaine  ;
    this.compte.fin_exercice  = this.thirdFormGroup.value.finExercice ;
    this.compte.chiffre_affaire = this.thirdFormGroup.value.chiffreAffaire ;
    this.compte.nbr_salaries = this.thirdFormGroup.value.nbrSalaries ;
    this.compte.payes_activite = this.thirdFormGroup.value.payeActivite ;
    // fourth form groupe
    this.compte.type_alimentation = this.fourthFormGroup.value.selectAlimentation;
    this.compte.type_service = this.fourthFormGroup.value.selectServices;
    // fifth form groupe
    if (!(this.selectedImage1 == null)) {
      // tslint:disable-next-line:prefer-const
      let filePath1 = `test/${this.selectedImage1.name}_${new Date()}`;
      const fileRef = this.storage.ref(filePath1);
      this.storage.upload(filePath1, this.selectedImage1).snapshotChanges().pipe(
        finalize(() => {
          fileRef.getDownloadURL().subscribe((url) => {
            this.compte.copie_CIN = url;

          });
        })
      ).subscribe();
    }
    if (!(this.selectedImage2 == null)) {
      // tslint:disable-next-line:prefer-const
      let filePath2 = `test/${this.selectedImage2.name}_${new Date()}`;
      const fileRef = this.storage.ref(filePath2);
      this.storage.upload(filePath2, this.selectedImage2).snapshotChanges().pipe(
        finalize(() => {
          fileRef.getDownloadURL().subscribe((url) => {
            this.compte.fiche_paie = url;

          });
        })
      ).subscribe();
    }
    if (!(this.selectedImage3 == null)) {
      // tslint:disable-next-line:prefer-const
      let filePath3 = `test/${this.selectedImage3.name}_${new Date()}`;
      const fileRef = this.storage.ref(filePath3);
      this.storage.upload(filePath3, this.selectedImage3).snapshotChanges().pipe(
        finalize(() => {
          fileRef.getDownloadURL().subscribe((url) => {
            this.compte.facture = url;
          });
        })
      )
        .subscribe();
    }

    // type du compte
    this.compte.type_compte = 'morale';
    console.log(this.compte);

    setTimeout(() => {
      this.service.createAccount(this.compte).subscribe(data => {
        }, err => {
          console.log(err);
        }
      );
    }, 10000);


  }
}
