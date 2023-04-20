﻿// <auto-generated />
using JOB_PORTAL_WEBAPP.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

#nullable disable

namespace JOB_PORTAL_WEBAPP.Migrations
{
    [DbContext(typeof(JobPortalContext))]
    [Migration("20230420052656_JobModel Field modified")]
    partial class JobModelFieldmodified
    {
        /// <inheritdoc />
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "7.0.5")
                .HasAnnotation("Relational:MaxIdentifierLength", 128);

            SqlServerModelBuilderExtensions.UseIdentityColumns(modelBuilder);

            modelBuilder.Entity("JOB_PORTAL_WEBAPP.JobModel", b =>
                {
                    b.Property<int>("JobID")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("JobID"));

                    b.Property<int>("CompanyID")
                        .HasColumnType("int");

                    b.Property<string>("Description")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("JobType")
                        .HasColumnType("nvarchar(max)");

                    b.Property<decimal>("Salary")
                        .HasColumnType("decimal(18, 2)");

                    b.Property<int>("SubCatID")
                        .HasColumnType("int");

                    b.HasKey("JobID");

                    b.HasIndex("CompanyID");

                    b.HasIndex("SubCatID");

                    b.ToTable("Jobs");
                });

            modelBuilder.Entity("JOB_PORTAL_WEBAPP.Models.CategoryModel", b =>
                {
                    b.Property<int>("CatID")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("CatID"));

                    b.Property<string>("CatName")
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("CatID");

                    b.ToTable("Categories");
                });

            modelBuilder.Entity("JOB_PORTAL_WEBAPP.Models.CompanyModel", b =>
                {
                    b.Property<int>("CompanyID")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("CompanyID"));

                    b.Property<string>("CompanyLocation")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("CompanyName")
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("CompanyID");

                    b.ToTable("Companies");
                });

            modelBuilder.Entity("JOB_PORTAL_WEBAPP.Models.SubcategoryModel", b =>
                {
                    b.Property<int>("SubCatID")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("SubCatID"));

                    b.Property<int>("CatID")
                        .HasColumnType("int");

                    b.Property<string>("SubCatName")
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("SubCatID");

                    b.HasIndex("CatID");

                    b.ToTable("Subcategories");
                });

            modelBuilder.Entity("JOB_PORTAL_WEBAPP.Models.UserModel", b =>
                {
                    b.Property<int>("UserID")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("UserID"));

                    b.Property<string>("Email")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Password")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Role")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Username")
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("UserID");

                    b.ToTable("Users");
                });

            modelBuilder.Entity("JOB_PORTAL_WEBAPP.JobModel", b =>
                {
                    b.HasOne("JOB_PORTAL_WEBAPP.Models.CompanyModel", "Company")
                        .WithMany()
                        .HasForeignKey("CompanyID")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("JOB_PORTAL_WEBAPP.Models.SubcategoryModel", "Subcategory")
                        .WithMany()
                        .HasForeignKey("SubCatID")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Company");

                    b.Navigation("Subcategory");
                });

            modelBuilder.Entity("JOB_PORTAL_WEBAPP.Models.SubcategoryModel", b =>
                {
                    b.HasOne("JOB_PORTAL_WEBAPP.Models.CategoryModel", "Category")
                        .WithMany()
                        .HasForeignKey("CatID")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Category");
                });
#pragma warning restore 612, 618
        }
    }
}
