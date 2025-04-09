import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Companie } from "../models/companie.model";
import { firstValueFrom } from "rxjs";
import { CompanieDTO } from "../dto/companie/companie.dto";
import { environment } from "../../environments/environment";
import { CompanieMapper } from "../mappers/companie.mapper";
import { plainToClass } from 'class-transformer';

@Injectable({
  providedIn: 'root',
})
export class CompanieService {

  constructor(private readonly http: HttpClient, private companieMappepr: CompanieMapper) {}

  async getCompanies() {
    let companies: undefined | Companie[];

    try {
      const response = await firstValueFrom(
        this.http.get<CompanieDTO[]>(`${environment.apiUrl}/companies`)
      );

      companies = response.map(companie => this.companieMappepr.map(plainToClass(CompanieDTO, companie)))
      .filter((companie): companie is Companie => companie !== null);
    } catch (error) {
      console.error('Error fetching companies:', error);
      return [];
    }

    return companies;
  }
}