import {Component, OnInit, ViewChild} from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Compte} from '../shared/models/Compte';
import {User} from '../shared/models/User';
import {Router} from '@angular/router';
import {AccountService} from '../services/account.service';
import {AuthService} from '../shared/auth.service';
import {finalize} from 'rxjs/operators';
import {AngularFireStorage} from '@angular/fire/storage';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {


  @ViewChild('step', {static: false}) step;
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  thirdFormGroup: FormGroup;
  fourthFormGroup: FormGroup;
  fifthFormGroup: FormGroup;
  sixthFormGroup: FormGroup;
  seventhFormGroup: FormGroup;
  compte = new Compte();
  submitted = false;
  public selectCivilite: string;
  selectedValue: string;
  const; // @ts-ignore
  // @ts-ignore
  countryList = require('country-list');
  countrys = this.countryList.getNames();
  imgSrc1: string;
  selectedImage1: any = null;
  imgSrc2: string;
  selectedImage2: any = null;
  imgSrc3: string;
  selectedImage3: any = null;


  // tslint:disable-next-line:variable-name max-line-length
  constructor(private _formBuilder: FormBuilder, private service: AccountService, private route: Router, private user: AuthService, private storage: AngularFireStorage) {
  }

  ngOnInit() {
    this.firstFormGroup = this._formBuilder.group({
      nom: ['', Validators.required],
      prenom: ['', Validators.required],
      gender: ['', Validators.required],
      nomJF: [''],
      code_client: [''],
      selectCredit: ['', Validators.required],
      selectClient: ['', Validators.required]

    });
    this.secondFormGroup = this._formBuilder.group({
      pays: ['', Validators.required],
      adresse: ['', Validators.required],
      gouvernorat: ['', Validators.required],
      mobile: ['', Validators.required],
      domicile: ['', Validators.required],
      selectDomicile: ['', Validators.required]
    });
    this.thirdFormGroup = this._formBuilder.group({
      birthDate: ['', Validators.required],
      gouvernoratNaissance: ['', Validators.required],
      selectCountry: ['', Validators.required],
      nationalite: ['', Validators.required],
      secondeNationalite: ['']
    });
    this.fourthFormGroup = this._formBuilder.group({
      selectSituationFamiliale: ['', Validators.required],

    });
    this.fifthFormGroup = this._formBuilder.group({
      selectDomaine: ['', Validators.required],
      domaine: ['', Validators.required],
      profession: ['', Validators.required],
      revenuMensuel: ['', Validators.required]

    });
    this.sixthFormGroup = this._formBuilder.group({
      selectAlimentation: ['', Validators.required],
      selectServices: ['', Validators.required]
    });
    this.seventhFormGroup = this._formBuilder.group({
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
    this.compte.nom = this.firstFormGroup.value.nom;
    this.compte.prenom = this.firstFormGroup.value.prenom;
    this.compte.gender = this.firstFormGroup.value.gender;
    this.compte.nomJF = this.firstFormGroup.value.nomJF;
    this.compte.code_client = this.firstFormGroup.value.code_client;
    this.compte.credit_immediat = this.firstFormGroup.value.selectCredit;
    // second form groupe
    this.compte.pays = this.secondFormGroup.value.pays;
    this.compte.adresse = this.secondFormGroup.value.adresse;
    this.compte.gouvernorat = this.secondFormGroup.value.gouvernorat;
    this.compte.tel_mobile = this.secondFormGroup.value.mobile;
    this.compte.tel_domicile = this.secondFormGroup.value.domicile;
    this.compte.situationDomicile = this.secondFormGroup.value.selectDomicile;
    // third form groupe
    this.compte.date_naissance = this.thirdFormGroup.value.birthDate;
    this.compte.gouvernorat_naissance = this.thirdFormGroup.value.gouvernoratNaissance;
    this.compte.pays_naissance = this.thirdFormGroup.value.selectCountry;
    this.compte.nationalite = this.thirdFormGroup.value.nationalite;
    this.compte.seconde_nationalite = this.thirdFormGroup.value.secondeNationalite;
    // fourth form groupe
    this.compte.situation_familiale = this.fourthFormGroup.value.selectSituationFamiliale;
    // fifth form groupe
    this.compte.domaine = this.fifthFormGroup.value.domaine;
    this.compte.profession = this.fifthFormGroup.value.profession;
    this.compte.revenu_net_mensuel = this.fifthFormGroup.value.revenuMensuel;
    // sixth form groupe
    this.compte.type_alimentation = this.sixthFormGroup.value.selectAlimentation;
    this.compte.type_service = this.sixthFormGroup.value.selectServices;
    // seventh form groupe

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
    this.compte.type_compte = 'physique';
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
