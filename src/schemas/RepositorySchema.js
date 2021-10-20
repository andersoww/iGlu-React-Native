export default class RepositorySchema {
  static schema = {
    name: 'Repository',
    PrimaryKey:'id',
    properties: {
      id:'string',
      nome:'string',
      cargaTotal:'int',


      
    },
  };
}
