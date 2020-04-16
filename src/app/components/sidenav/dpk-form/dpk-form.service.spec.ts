import { TestBed } from '@angular/core/testing'

import { DpkFormService } from './dpk-form.service'

describe('DpkFormService', () => {
    let service: DpkFormService

    beforeEach(() => {
        TestBed.configureTestingModule({})
        service = TestBed.inject(DpkFormService)
    })

    it('should be created', () => {
        expect(service).toBeTruthy()
    })
})
