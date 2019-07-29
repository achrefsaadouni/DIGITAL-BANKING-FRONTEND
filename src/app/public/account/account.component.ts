import {Component, OnInit, ViewChild} from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Compte} from '../shared/models/Compte';
import {User} from '../shared/models/User';

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

  constructor(private _formBuilder: FormBuilder) { }

  ngOnInit() {
    this.firstFormGroup = this._formBuilder.group({
      nom: ['', Validators.required],
      prenom: ['', Validators.required],
      gender: ['', Validators.required],
      nomJF: ['', Validators.required],
      code_client: ['', Validators.required],
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
      paysNaissance: ['', Validators.required],
      gouvernoratNaissance: ['', Validators.required],
      nationalite: ['', Validators.required],
      secondeNationalite: ['', Validators.required]
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
      selectCarte: ['', Validators.required],
      versement: ['', Validators.required]
    });
  }

  SubmitCompte() {

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
    this.compte.pays_naissance = this.thirdFormGroup.value.paysNaissance;
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
    this.compte.type_carte = this.seventhFormGroup.value.selectCarte;

  }
}
