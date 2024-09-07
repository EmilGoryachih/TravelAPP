"""

Revision ID: 242ada332119
Revises: 09ce6c0d658d
Create Date: 2024-09-07 16:08:19.181933

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = '242ada332119'
down_revision: Union[str, None] = '09ce6c0d658d'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('user_friends',
    sa.Column('user_id', sa.UUID(), nullable=False),
    sa.Column('friend_id', sa.UUID(), nullable=False),
    sa.ForeignKeyConstraint(['friend_id'], ['users.id'], ),
    sa.ForeignKeyConstraint(['user_id'], ['users.id'], ),
    sa.PrimaryKeyConstraint('user_id', 'friend_id')
    )
    # ### end Alembic commands ###


def downgrade() -> None:
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('user_friends')
    # ### end Alembic commands ###
