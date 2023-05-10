using System;
using System.Configuration;
using CRUD.Repositorio;
using FluentMigrator.Runner;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;

namespace CRUD
{
    internal static class Program
    {

        [STAThread]
        static void Main()
        {
            
            var builder = CriaHostBuilder();
            var serviceProvider = builder.Build().Services;
            //var scope = serviceProvider.CreateScope();
            //UpdateDatabase(scope.ServiceProvider);
            
            var repositorio = serviceProvider.GetService<IRepositorio>();

            ApplicationConfiguration.Initialize();
            Application.Run(new ControleDePecas(repositorio));
        }

        static IHostBuilder CriaHostBuilder()
        {
            return Host.CreateDefaultBuilder()
                .ConfigureServices((context, services) => {
                    services.AddScoped<IRepositorio, RepositorioComBancoSql>();
                });
        }

























        private static ServiceProvider CreateServices()
        {
            var connectionString = ConfigurationManager.ConnectionStrings["ConexaoBD"].ConnectionString;
            return new ServiceCollection()
                .AddFluentMigratorCore()
                .ConfigureRunner(rb => rb
                    .AddSqlServer()
                    .WithGlobalConnectionString(connectionString)
                    .ScanIn(typeof(AdicionarTabelaPecas).Assembly).For.Migrations())
                .AddLogging(lb => lb.AddFluentMigratorConsole())
                .BuildServiceProvider(false);
        }

        private static void UpdateDatabase(IServiceProvider serviceProvider)
        {
            var runner = serviceProvider.GetRequiredService<IMigrationRunner>();
            runner.MigrateUp();
        }
    }
}
