// import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
// import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
// import {ActivatedRoute, Router} from '@angular/router';
// import {UnitOfMeasure} from '../unit.of.measure';
// import {UnitOfMeasureService} from '../unit.of.measure.service';
// import {ASSET_SETTING, UNIT_OF_MEASURE} from '../../app/routes';
//
// @Component({
//   selector: 'app-unit-of-measure-form',
//   templateUrl: './unit.of.measure.form.component.html',
//   styleUrls: ['./unit.of.measure.form.component.css']
// })
// export class UnitOfMeasureFormComponent implements OnInit {
//
//   name: FormControl;
//   description: FormControl;
//   unitOfMeasureForm: FormGroup;
//
//   update = false;
//   doNotDisplayFailureMessage = true;
//
//   private unitOfMeasure: UnitOfMeasure;
//   private unitOfMeasureLink = `/${ASSET_SETTING}/${UNIT_OF_MEASURE}/listing`;
//   @Input() trans: boolean;
//   @Output() left: EventEmitter<boolean> = new EventEmitter();
//
//   constructor(private unitOfMeasureService: UnitOfMeasureService,
//               private formBuilder: FormBuilder,
//               private route: ActivatedRoute,
//               private router: Router) {
//
//     this.unitOfMeasure = new UnitOfMeasure();
//
//     this.name = new FormControl('', Validators.required);
//     this.description = new FormControl('');
//
//     this.unitOfMeasureForm = formBuilder.group({
//       'name': this.name,
//       'description': this.description
//     });
//
//     this.unitOfMeasureForm
//       .valueChanges
//       .subscribe(value => {
//         this.unitOfMeasure.name = value.name;
//         this.unitOfMeasure.description = value.description;
//       });
//
//   }
//
//   ngOnInit(): void {
//     if (this.route.snapshot && this.route.snapshot.data['unitOfMeasure']) {
//       const unitOfMeasure = this.route.snapshot.data['unitOfMeasure'];
//       this.setInputValues(unitOfMeasure);
//       this.update = true;
//       this.unitOfMeasure = unitOfMeasure;
//     }
//   }
//
//   setInputValues(unitOfMeasure: UnitOfMeasure) {
//     this.name.setValue(unitOfMeasure.name);
//     this.description.setValue(unitOfMeasure.description);
//   }
//
//   onCreate() {
//     this.doNotDisplayFailureMessage = true;
//
//     this.unitOfMeasureService.addUnitOfMeasure(this.unitOfMeasure)
//       .subscribe( value => {
//         if (value && value.unitOfMeasurementId) {
//           if (this.trans) {
//             this.left.emit(true);
//           }else {
//             this.router.navigate([this.unitOfMeasureLink]);
//           }
//         } else {
//           this.doNotDisplayFailureMessage = false;
//         }
//       }, error => {
//         console.log(error);
//         this.doNotDisplayFailureMessage = false;
//       })
//   }
//
//   onUpdate() {
//     this.doNotDisplayFailureMessage = true;
//
//     this.unitOfMeasureService.updateUnitOfMeasure(this.unitOfMeasure)
//       .subscribe( value => {
//         if (value) {
//           if (this.trans) {
//             this.left.emit(true);
//           }else {
//             this.router.navigate([this.unitOfMeasureLink]);
//           }
//         } else {
//           this.doNotDisplayFailureMessage = false;
//         }
//       }, error => {
//         console.log(error);
//         this.doNotDisplayFailureMessage = false;
//       })
//   }
//
//   cancel() {
//     if (this.trans) {
//       this.left.emit(true);
//     }else {
//       this.router.navigate([this.unitOfMeasureLink]);
//     }
//   }
//
// }
