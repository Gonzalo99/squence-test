import { Injectable } from "@angular/core";
import { CompanieDTO } from "../dto/companie/companie.dto";
import { Companie } from "../models/companie.model";
import { validateSync } from "class-validator";

@Injectable({
  providedIn: 'root',
})
export class CompanieMapper {
  map(companie: CompanieDTO): Companie | undefined {
    if (!companie) {
      return undefined;
    }

    const errors = validateSync(companie);
    if (errors.length) {
      console.debug(errors);

      return undefined;
    }
    
    return new Companie(
      companie.id,
      companie.name,
      companie.country,
      companie.createYear,
      companie.employees,
      companie.rating,
      companie.songs
    );
  }
}