export default class User {
  constructor(
    public _id: string,
    public email: string,
    public collabId: string,
    public listfavored: string,
    public name: string,
    public surname: string,
    public password: string,
    public numFiscal: string,
    public phoneNumber: string,
    public nomStructure: string,
    public phoneStructure: string,
    public adressStructure: string,
    public abonnement: string,
    public notifId: string,
  ) { }
}
