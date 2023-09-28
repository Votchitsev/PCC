"""add unique constraint to inspection_question

Revision ID: 0d16fd40da6b
Revises: a2d4bc26d001
Create Date: 2023-09-19 22:30:18.724330

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '0d16fd40da6b'
down_revision = 'a2d4bc26d001'
branch_labels = None
depends_on = None


def upgrade() -> None:
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_unique_constraint(None, 'inspection_question', ['question_id', 'inspection_id'])
    # ### end Alembic commands ###


def downgrade() -> None:
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_constraint(None, 'inspection_question', type_='unique')
    # ### end Alembic commands ###
