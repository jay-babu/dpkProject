import { TestBed } from '@angular/core/testing'

import { AvControlService } from './av-control.service'

describe('AudioControlService', () => {
    let service: AvControlService

    beforeEach(() => {
        TestBed.configureTestingModule({})
        service = TestBed.inject(AvControlService)
    })

    it('should be created', () => {
        expect(service).toBeTruthy()
    })
})
