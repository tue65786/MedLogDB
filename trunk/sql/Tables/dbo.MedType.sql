SET ANSI_NULLS ON
SET QUOTED_IDENTIFIER ON
SET ANSI_PADDING ON
GO
CREATE TABLE [dbo].[MedType] (
		[MedTypeID]     [varchar](16) COLLATE SQL_Latin1_General_CP1_CI_AS NOT NULL
) ON [PRIMARY]
GO
ALTER TABLE [dbo].[MedType]
	ADD
	CONSTRAINT [PK_MedType]
	PRIMARY KEY
	CLUSTERED
	([MedTypeID])
	ON [PRIMARY]
GO
ALTER TABLE [dbo].[MedType] SET (LOCK_ESCALATION = TABLE)
GO
