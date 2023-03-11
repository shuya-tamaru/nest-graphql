import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Owner } from '../owners/entities/owner.entity';
import { OwnersService } from '../owners/owners.service';
import { CreatePetInput } from './dto/create-pet.input';
import { Pet } from './pet.entity';

@Injectable()
export class PetsService {
  constructor(
    @InjectRepository(Pet) private petsRepositry: Repository<Pet>,
    private ownerService: OwnersService,
  ) {}

  createPet(createPetInput: CreatePetInput): Promise<Pet> {
    const newPet = this.petsRepositry.create(createPetInput);
    return this.petsRepositry.save(newPet);
  }

  findAll(): Promise<Pet[]> {
    return this.petsRepositry.find();
  }

  findOne(id: number): Promise<Pet> {
    return this.petsRepositry.findOneBy({ id });
  }

  getOwner(ownerId: number): Promise<Owner> {
    return this.ownerService.findOne(ownerId);
  }
}
