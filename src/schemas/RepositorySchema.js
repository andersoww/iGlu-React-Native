export default class RepositorySchema {
  static schema = {
    name: 'Repository',
    primaryKey:'id',
    properties: {
      id:{type:'string'},
      cidade:'string',
      estado:'string',
      nome:'string',
      btu:'int',
      tr:'int'


      
    },
  };
}
