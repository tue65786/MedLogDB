SET ANSI_NULLS ON
SET QUOTED_IDENTIFIER ON
SET ANSI_PADDING OFF
GO
CREATE TABLE [dbo].[Medication] (
		[MedicationID]     [int] NOT NULL
) ON [PRIMARY]
GO
ALTER TABLE [dbo].[Medication]
	ADD
	CONSTRAINT [PK_Medication]
	PRIMARY KEY
	CLUSTERED
	([MedicationID])
	ON [PRIMARY]
GO
ALTER TABLE [dbo].[Medication] SET (LOCK_ESCALATION = TABLE)
GO