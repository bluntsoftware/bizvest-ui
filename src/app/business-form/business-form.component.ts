import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup} from "@angular/forms";
import { ActivatedRoute, Router} from "@angular/router";
import {BusinessService} from "../services/business.service";
import {Business} from "../services/app-model";

@Component({
  selector: 'app-business-form',
  templateUrl: './business-form.component.html',
  styleUrls: ['./business-form.component.scss']
})
export class BusinessFormComponent implements OnInit {
  item:Business;
  form:FormGroup;

  constructor(private fb: FormBuilder,private service:BusinessService,private router: Router,private route: ActivatedRoute) {
    this.item = this.emptyItem();
    this.form = this.createForm();
  }

  ngOnInit(): void {
     let id = this.route.snapshot.paramMap.get('id');
     if(id){
         this.service.getById(id).subscribe(i=>{
             this.item = i;
             this.form = this.createForm();
         });
     }
  }

  public save() {
    this.service.save(Object.assign({}, this.item,this.form.getRawValue())).subscribe(()=>{
        this.back();
    });
  }

  public back(){
     this.router.navigate(['/businesss']).then();
  }

  public emptyItem():Business{
    return {
			id:null,
			name:'',
			address:'',
			city:'',
			state:'',
			zip:'',
			country:'',
			phone:'',
			email:'',
			website:'',
			linkedIn:'',
			blog:'',
			twitter:'',
			ein:'',
			description:'',
			formation:'',
			industry:'',
			subIndustry:'',
			created:'',
			updated:'',
			founded:'',
			numberEmployees:0,
			mission:'',
			milestones:[],
			products:[],
			management:{
				managers:[],
			},
			capitalization:{
				fundingGoal:0,
				fundingType:'',
				fundingAllocation:[],
				ownership:[],
				estimateBusinessValue:0,
			},
			marketAssessment:{
				marketingPlan:'',
				salesPlan:'',
				markets:[],
			},
			competitiveAssessment:{
				competitors:[],
				competitiveEdge:'',
			},
			financialSummary:{
				lastYearRevenue:0,
				thisYearRevenue:0,
				projectedRevenue:0,
				lastYearExpense:0,
				thisYearExpense:0,
				projectedExpense:0,
			},
		};
  }

  public createForm():FormGroup{
     return this.fb.group({
        "name": [this.item.name],
        "address": [this.item.address],
        "city": [this.item.city],
     });
  }
}
