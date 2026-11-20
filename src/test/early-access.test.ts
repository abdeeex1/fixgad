import { describe, expect, it } from 'vitest';
import { earlyAccessSchema, prepareEarlyAccess } from '../lib/early-access';
const valid={name:'Example Visitor',email:'visitor@example.com',city:'Agadir',type:'customer'};
describe('early access boundaries',()=>{
 it('does not require a phone number',()=>{expect(earlyAccessSchema.safeParse(valid).success).toBe(true);});
 it('accepts the two user types',()=>{expect(earlyAccessSchema.safeParse({...valid,type:'hrayfi'}).success).toBe(true);expect(earlyAccessSchema.safeParse({...valid,type:'employee'}).success).toBe(false);});
 it('validates name, email and city',()=>{for(const key of ['name','email','city'])expect(earlyAccessSchema.safeParse({...valid,[key]:''}).success).toBe(false);});
 it('never claims an email was sent or registration stored',()=>{expect(prepareEarlyAccess(valid).status).toBe('not-connected');});
});
