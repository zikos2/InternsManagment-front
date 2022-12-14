import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { IconSetService } from '@coreui/icons-angular';
import { assignStudentDTO } from 'src/app/dto/assignStudent.dto';
import { cilPencil, cilZoom, cilCheckCircle, cilTrash } from '@coreui/icons';
import { EncadrantService } from 'src/app/services/encadrant/encadrant.service';

@Component({
  selector: 'app-affectations',
  templateUrl: './affectations.component.html',
  styleUrls: ['./affectations.component.scss'],
})
export class AffectationsComponent implements OnInit {
  assignStudentForm = this.fb.group<assignStudentDTO>({
    encadrant: undefined,
    etudiant: undefined,
    stage: undefined,
    emplacementStage: undefined,
    date_debut: undefined,
    date_fin: undefined,
  });

  locations: any = [];

  isModalVisible = false;

  toastVisible = false;
  percentage = 0;
  toastMessage = '';
  constructor(
    public iconSet: IconSetService,
    private fb: FormBuilder,
    private encadrantService: EncadrantService,
    private activateRoute: ActivatedRoute
  ) {
    iconSet.icons = { cilPencil, cilZoom, cilCheckCircle, cilTrash };
  }

  ngOnInit(): void {
    this.encadrantService.getInernshipsLocations().subscribe((locs) => {
      this.locations = locs;
    });

    this.activateRoute.queryParams.subscribe((params) => {
      console.log(params);
      if (params?.['stageId'] && this.encadrantService.selectedStudent) {
        this.encadrantService.me().subscribe((enc) => {
          console;
          this.assignStudentForm.controls.encadrant.setValue(enc);
        });
        console.log(this.encadrantService.selectedStudent);
        this.assignStudentForm.controls.etudiant.setValue(
          this.encadrantService.selectedStudent
        );

       this.assignStudentForm.controls.stage.setValue(
          this.encadrantService.selectedStudent!.niveau!.stages![
            params['stageId']
          ]
        );
        this.isModalVisible = true;
      }
    });
  }

  onSubmit() {
    console.log(this.assignStudentForm.value);
    this.encadrantService
      .assignStudentToInternship(
        this.assignStudentForm.value as assignStudentDTO
      )
      .subscribe((res) => {
        console.log(res);
        if (res) {
          this.toastMessage = 'Etudiant affecter';
          this.toastVisible = true;
        }
      });
  }

  toggleModal(event: any) {
    this.isModalVisible = event;
  }

  toggleToastSuccess() {
    this.toastVisible = !this.toastVisible;
  }

  onVisibleChange($event: boolean) {
    this.toastVisible = $event;
    this.percentage = !this.toastVisible ? 0 : this.percentage;
  }

  onTimerChange($event: number) {
    this.percentage = $event * 25;
  }
}
