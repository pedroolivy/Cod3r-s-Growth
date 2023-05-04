using FluentMigrator;

namespace CRUD
{
    [Migration(20230504094800)]
    public class AdicionarTabelaPecas : Migration
    {
        public override void Up()
        {
            Create.Table("Peca")
                .WithColumn("Id").AsInt64().PrimaryKey().Identity()
                .WithColumn("Nome").AsString()
                .WithColumn("Categoria").AsString()
                .WithColumn("Descricao").AsString()
                .WithColumn("Estoque").AsString()
                .WithColumn("DataDeFabricacao").AsString();
        }

        public override void Down()
        {
            Delete.Table("Peca");
        }
    }
}
