import { TestBed } from '@angular/core/testing';

import { ItemInCollectionService } from './item-in-collection.service';

describe('ItemInCollectionService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ItemInCollectionService = TestBed.get(ItemInCollectionService);
    expect(service).toBeTruthy();
  });
});
